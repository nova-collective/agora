// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.24;

import "./DEC.sol";

/// @title The Registry of the Digital Electoral Cards
/// @author Christian Palazzo <palazzochristian@yahoo.it>
/// @custom:experimental This is an experimental contract.
contract DECsRegistry {
    address public owner;
    string public name;

    /// @notice this is the list of stamps of elections in which the voter participated
    /// @dev the first address is related to the Voter's DEC, the second array is the Voter's stamps list
    mapping(address => address[]) electoralStamps;

    /// @notice this function contains the list of DECs
    /// @dev the first address is related to the Voter's EOA, the second address is related to the DEC
    mapping(address => address) registry;

    event DECRegistered(address indexed voter, address dec);
    event DECStamped(address indexed election, address indexed voter);
    
    constructor(string memory _name) {
        /// @dev only the owner of the contract has write permissions
        owner = msg.sender;
        name = _name;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    /// @notice DECs REgistry name setter function
    function setName(string memory _name) external onlyOwner {
        name = _name;
    }

    /// @notice DECs REgistry name getter function
    function getName() external view returns (string memory) {
        return name;
    }

    /// @notice this function is used by the third party authority to register a Voter's DEC in the registry
    function registerDEC(address dec, address voter) external onlyOwner {
        require(
            registry[voter] == address(0),
            "The Voter's DEC has been already registered"
        );
        registry[voter] = dec;
        emit DECRegistered(voter, registry[voter]);
        return;
    }

    /// @notice this function returns an encrypted DEC in order to check if a Voter has the voting rights
    function getDEC(address voter) external view returns (address) {
        require(
            registry[voter] != address(0),
            "The Voter don't have a registered DEC"
        );
        return registry[voter];
    }

    /// @notice this function checks in the registry if the Voter already voted in a certail election
    function hasVoterAlreadyVoted(
        address voter,
        address election
    ) external view returns (bool) {
        for (uint i = 0; i < electoralStamps[voter].length; i++) {
            if (electoralStamps[voter][i] == election) {
                return true;
            }
        }
        return false;
    }

    /// @notice this function put the election stamp on the Voter's stamps list after the vote
    function stamps(address election, address voter) external onlyOwner {
        electoralStamps[voter].push(election);
        emit DECStamped(election, voter);
        return;
    }
}
