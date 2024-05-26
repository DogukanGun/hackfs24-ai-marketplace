// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

interface IAIModel {
    function execute() external payable;
    function setAiModelSubscriberContract(address _aiModelSubscriberContract) external;
    function getMyCreditScoreCID() external view returns (string memory);
}