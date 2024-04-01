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
    uint256 private registrationStart;
    uint256 private registrationEnd;
    int8 private votingPoints;
    mapping (uint256 => string) private ballotBox; // change the data types later
    mapping (uint256 => string) results; // change the data types later

    constructor(
        uint256 _registrationStart,
        uint256 _registrationEnd,
        int8 _votingPoints
    ) {
        require(_registrationStart < _registrationEnd, "The registration start date can't be equal or after the registration end date");
        require(_votingPoints > 19, "It is not possible to assing less that 20 voting points for the election");

        owner = msg.sender;
        registrationStart = _registrationStart;
        registrationEnd = _registrationEnd;
        votingPoints = _votingPoints;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    /// @notice this function checks if the transaction occours when the elections are open
    function isIvokedInElectionPeriod() private view returns (bool) {
        return (block.timestamp >= electionStart && block.timestamp <= electionEnd);
    }

    /// @notice this function checks if the transaction occours when the registration are open
    function isIvokedInRegistrationPeriod() private view returns (bool) {
        return (block.timestamp >= registrationStart && block.timestamp <= registrationEnd);
    }

    /// @notice this function checks if the transaction occours after the election is closed
    function isElectionClosed() private view returns (bool) {
        return block.timestamp > electionEnd;
    }

    /// @notice this function checks if the transaction occours after the registration is closed
    function isRegistrationClosed() private view returns (bool) {
        return block.timestamp > registrationEnd;
    }

    function setElectionStart(uint256 _electionStart) public onlyOwner {
        require(block.timestamp > registrationEnd, "Elections can't start before the end of the registration process");
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

    function setRegistrationStart(uint256 _registrationStart) public onlyOwner {
        require(!isIvokedInRegistrationPeriod(), "Registrations have already started, it's too late for changing the start of the registration");
        require(!isRegistrationClosed(), "Registration are closed, it's not possible to change the start of the registration");
        registrationStart = _registrationStart;
    }

    function getRegistrationStart() public view returns (uint256) {
        return registrationStart;
    }

    function setRegistrationEnd(uint256 _registrationEnd) public onlyOwner {
        require(!isIvokedInRegistrationPeriod(), "Registrations have already started, it's too late for changing the end of the registration");
        require(!isRegistrationClosed(), "Registrations are closed, it's not possible to change the end of the registration");
        registrationEnd = _registrationEnd;
    }

    function getRegistrationEnd() public view returns (uint256) {
        return registrationEnd;
    }

    /// @notice this function collects the ballots
    function vote() public view {
        require(isIvokedInElectionPeriod(), "Elections are not open");
        require(!isElectionClosed(), "Elections are closed");
    }

    /// @notice this function calculates the elections results
    function scrutiny() public view onlyOwner {
        require(isElectionClosed(), "Scrutiny is possible only after the elections end");
    }
}