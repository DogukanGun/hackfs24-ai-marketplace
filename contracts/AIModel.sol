// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;
import "https://github.com/bacalhau-project/lilypad-v0/blob/main/hardhat/contracts/LilypadEventsUpgradeable.sol";
import "https://github.com/bacalhau-project/lilypad-v0/blob/main/hardhat/contracts/LilypadCallerInterface.sol";
import "DePinFilecoin/interface/IAIModel.sol";

contract AIModel is LilypadCallerInterface,IAIModel{
    address public bridgeAddress;
    LilypadEventsUpgradeable bridge;
    address public aiModelSubscriberContract;
    uint256 public lilypadFee;
    address public executionServer;
    string image;
    address public owner;  // The owner's address

    constructor(address _bridgeContractAddress,string memory _image,address _executionServer) {
        bridgeAddress = _bridgeContractAddress;
        bridge = LilypadEventsUpgradeable(_bridgeContractAddress);
        uint fee = bridge.getLilypadFee();
        lilypadFee = fee;
        image = _image;
        owner = msg.sender;
        executionServer = _executionServer;
    }

    string public jobResult;
    address public jobIDs;

    // Removed Results structure and related array as they are not needed anymore

    event NewResult(address caller, string result);

    modifier onlyExecution() {
        require(msg.sender == executionServer, "Only the executionServer can call this function");
        _;
    }

    modifier onlySubscriber() {
        require(msg.sender == aiModelSubscriberContract, "Only the executionServer can call this function");
        _;
    }

    function execute() external payable onlySubscriber override{
        require(msg.value >= lilypadFee, "Not enough to run Lilypad job");

        string memory spec = string(abi.encodePacked(
            "{",
            '"Engine": "Docker",',
            '"Verifier": "Noop",',
            '"Publisher": "Estuary",',
            '"PublisherSpec": {"Type": "Estuary"},',
            '"Docker": {"Image":',
            image,
            '},',
            '"Language": {"JobContext": {}},',
            '"Wasm": {"EntryModule": {}},',
            '"Resources": {"GPU": ""},',
            '"Network": {"Type": "HTTP", "Domains": ["eth.public-rpc.com", "polygon-rpc.com"]},',
            '"Timeout": 1800,',
            '"Outputs": [{"StorageSource": "IPFS", "Name": "outputs", "Path": "/outputs"}],',
            '"Deal": {"Concurrency": 1}',
            "}"
        ));

        uint id = bridge.runLilypadJob{value: lilypadFee}(address(this), spec, uint8(LilypadResultType.CID));
        require(id > 0, "job didn't return a value");

    }

    function setAiModelSubscriberContract(address _aiModelSubscriberContract) external override {
        aiModelSubscriberContract = _aiModelSubscriberContract;
    }

    function getMyCreditScoreCID() external view onlyExecution override returns (string memory){
        return jobResult;
    }

    function lilypadFulfilled(
        address _from,
        uint256 _jobId,
        LilypadResultType _resultType,
        string calldata _result
    ) external override {
        require(_from == address(bridge)); 
        require(_resultType == LilypadResultType.CID);

        console.log("Job Id: ", _jobId, " has been fulfilled with result: ", _result);

        // Save the CID against the caller's address
        jobResult = _result;
        emit NewResult(executionServer, _result);
        delete executionServer;
    }

    function lilypadCancelled(
        address _from,
        uint256 _jobId,
        string calldata _errorMsg
    ) external override {
        require(_from == address(bridge)); 
        console.log(_errorMsg);
        delete executionServer;
    }
}