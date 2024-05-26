// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;
import "DePinFilecoin/interface/IAIModel.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";

contract AIModelSubscribe {

    address aiModelContract;
    address owner;
    uint256 public fee;
    IERC20 erc20;

    mapping (address => bool) subscribers;

    constructor(address erc20Address,address _aiModelContract,address _owner,uint256 _fee) {
        aiModelContract = _aiModelContract;
        owner = _owner;
        fee = _fee;
        erc20 = IERC20(erc20Address);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the executionServer can call this function");
        _;
    }

    modifier onlySubscriber() {
        require(subscribers[msg.sender] == true, "You must subscibe first");
        _;
    }

    function subscribe() external payable {
        require(subscribers[msg.sender] == false,"You have already subscribed");
        require(msg.value > fee, "You don't have enought fee to pay subscription");
        erc20.transferFrom(msg.sender, address(this), fee);
        subscribers[msg.sender] = true;
    }

    function execute() external payable onlySubscriber {
        IAIModel(aiModelContract).execute();
    }

    function getStake() public onlyOwner {
        erc20.transfer(owner, erc20.balanceOf(address(this)));
    }
}