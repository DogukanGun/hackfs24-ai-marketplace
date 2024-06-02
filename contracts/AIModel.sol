// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;
import "https://github.com/bacalhau-project/lilypad-v0/blob/main/hardhat/contracts/LilypadEventsUpgradeable.sol";
import "https://github.com/bacalhau-project/lilypad-v0/blob/main/hardhat/contracts/LilypadCallerInterface.sol";
import "DePinFilecoin/interface/IAIModel.sol";
import "DePinFilecoin/interface/IAIModelSubscribe.sol";

contract AIModel is LilypadCallerInterface, IAIModel {
    address public bridgeAddress;
    LilypadEventsUpgradeable bridge;
    address public aiModelSubscriberContract;
    uint256 public lilypadFee;
    string image;
    address public owner; // The owner's address

    constructor(address _bridgeContractAddress, string memory _image) {
        bridgeAddress = _bridgeContractAddress;
        bridge = LilypadEventsUpgradeable(_bridgeContractAddress);
        uint256 fee = 300000000000;
        lilypadFee = fee;
        image = _image;
        owner = msg.sender;
    }

    mapping(address => string) public jobResults;
    mapping(uint256 => address) public jobIDs;

    // Removed Results structure and related array as they are not needed anymore

    event NewResult(address caller, string result);

    modifier onlySubscriberContract() {
        require(
            msg.sender == aiModelSubscriberContract,
            "Only the executionServer can call this function"
        );
        _;
    }

    modifier onlySubscriber() {
        IAIModelSubscribe aiModelSubscriber = IAIModelSubscribe(aiModelSubscriberContract);
        bool res = aiModelSubscriber.isSubscribed(msg.sender);
        require(
            res,
            "Only the subscribed users can call this function"
        );
        _;
    }

    function ExecuteForUser(string calldata env) external payable {
        require(msg.value >= lilypadFee, "Not enough to run Lilypad job");
        string memory spec = string(
            abi.encodePacked(
                "{",
                '"Engine": "Docker",',
                '"Verifier": "Noop",',
                '"Publisher": "Estuary",',
                '"PublisherSpec": {"Type": "Estuary"},',
                '"Docker": {"Image": image, "EnvironmentVariables": ["ENV=',
                env,
                '"]},',
                '"Language": {"JobContext": {}},',
                '"Wasm": {"EntryModule": {}},',
                '"Resources": {"GPU": ""},',
                '"Network": {"Type": "HTTP", "Domains": ["eth.public-rpc.com", "polygon-rpc.com"]},',
                '"Timeout": 1800,',
                '"Outputs": [{"StorageSource": "IPFS", "Name": "outputs", "Path": "/outputs"}],',
                '"Deal": {"Concurrency": 1}',
                "}"
            )
        );
        uint256 id = bridge.runLilypadJob{value: lilypadFee}(
            address(this),
            spec,
            uint8(LilypadResultType.CID)
        );
        require(id > 0, "job didn't return a value");
        jobIDs[id] = owner;
    }

    function setAiModelSubscriberContract(address _aiModelSubscriberContract)
        external
        override
    {
        aiModelSubscriberContract = _aiModelSubscriberContract;
    }

    function getOutput() external view onlySubscriber override returns (string memory) {
        return jobResults[msg.sender];
    }

    function lilypadFulfilled(
        address _from,
        uint256 _jobId,
        LilypadResultType _resultType,
        string calldata _result
    ) external override {
        require(_from == address(bridge));
        require(_resultType == LilypadResultType.CID);

        console.log(
            "Job Id: ",
            _jobId,
            " has been fulfilled with result: ",
            _result
        );

        // Save the CID against the caller's address
        jobResults[jobIDs[_jobId]] = _result;
        emit NewResult(jobIDs[_jobId], _result);
        delete jobIDs[_jobId];
    }

    function lilypadCancelled(
        address _from,
        uint256 _jobId,
        string calldata _errorMsg
    ) external override {
        require(_from == address(bridge));
        console.log(_errorMsg);
        delete jobIDs[_jobId];
    }
}
