// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import "DePinFilecoin/interface/IAIModel.sol";
import "DePinFilecoin/interface/IAIModelSubscribe.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";

contract AIModelSubscribe is IAIModelSubscribe {

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

    modifier onlyAIModel() {
        require(msg.sender == aiModelContract, "Only the executionServer can call this function");
        _;
    }

    modifier onlySubscriber() {
        require(subscribers[msg.sender] == true, "You must subscibe first");
        _;
    }

    function isSubscribed(address user) external view onlyAIModel override returns(bool) {
        return subscribers[user];
    }

    function subscribe() external payable {
        require(subscribers[msg.sender] == false,"You have already subscribed");
        uint256 balance = erc20.balanceOf(msg.sender);
        require(balance > fee, "You don't have enought balance to pay subscription");
        uint allowance = erc20.allowance(msg.sender, address(this));
        require(allowance > fee, "You don't have enought allowance to pay subscription");
        erc20.transferFrom(msg.sender, address(this), fee);
        subscribers[msg.sender] = true;
    }

    function getStake() public onlyOwner {
        erc20.transfer(owner, erc20.balanceOf(address(this)));
    }
}