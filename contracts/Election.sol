// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.24;

/// @title The Election smart contract
/// @author Christian Palazzo <palazzochristian@yahoo.it>
/// @notice the Election contract is abstract. Different kind of elections contracts inherits form this one. 
/// @custom:experimental This is an experimental contract.
contract Election {
    address public owner;
    uint256 private electionStart;
    uint256 private electionEnd;
    mapping (uint256 => string) private ballotBox; // change the data types later
    mapping (uint256 => string) results; // change the data types later

    constructor(uint256 _electionStart, uint256 _electionEnd) {
        owner = msg.sender;
        electionStart = _electionStart;
        electionEnd = _electionEnd;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    /// @notice this function checks if the transaction occours when the elections are open
    function isIvokedInElectionPeriod() private view returns (bool) {
        return (block.timestamp >= electionStart && block.timestamp <= electionEnd);
    }

    /// @notice this function checks if the transaction occours after the election is closed
    function isElectionClosed() private view returns (bool) {
        return block.timestamp > electionEnd;
    }

    function setElectionStart(uint256 _electionStart) public onlyOwner {
        require(!isIvokedInElectionPeriod(), "Elections have already started, it's too late for changing the start of the elections");
        require(!isElectionClosed(), "Elections are closed, it's not possible to change the start of the elections");
        electionStart = _electionStart;
    }

    function getElectionStart() public view returns (uint256) {
        return electionStart;
    }

    function setElectionEnd(uint256 _electionEnd) public onlyOwner {
        require(!isIvokedInElectionPeriod(), "Elections have already started, it's too late for changing the end of the elections");
        require(!isElectionClosed(), "Elections are closed, it's not possible to change the end of the elections");
        electionEnd = _electionEnd;
    }

    function getElectionEnd() public view returns (uint256) {
        return electionEnd;
    }

    /// @notice this function collects the ballots
    function vote() public view {
        require(isIvokedInElectionPeriod(), "Elections are not open");
        require(!isElectionClosed(), "Elections are closed");
    }

    /// @notice this function calculates the elections results
    function scrutiny() public view onlyOwner {
        require(!isIvokedInElectionPeriod(), "Elections are in progress, it's not possible to calculate the results");
        require(isElectionClosed(), "Scrutiny is possible only after the elections end");
    }
}