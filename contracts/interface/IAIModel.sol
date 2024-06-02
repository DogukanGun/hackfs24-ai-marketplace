// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

interface IAIModel {
    function setAiModelSubscriberContract(address _aiModelSubscriberContract) external;
    function getOutput() external view returns (string memory);
}