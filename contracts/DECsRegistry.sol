// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.24;

import "./DEC.sol";

/// @title The Registry of the Digital Electoral Cards
/// @author Christian Palazzo <palazzochristian@yahoo.it>
/// @custom:experimental This is an experimental contract.
contract DECsRegistry is DEC {
    constructor() DEC() {}

    /// @notice this is the list of stamps of elections in which the voter participated
    /// @dev the first address is related to the Voter's EOA, the second array is the Voter's stamps list
    mapping(address => address[]) electoralStamps;

    /// @notice this function contains the list of DECs
    /// @dev the address is related to the Voter's EOA
    mapping(address => bytes) registry;

    event DECRegistered(address indexed voter, bytes dec);
    event DECStamped(address indexed election, address indexed voter);

    /// @notice this function is used by the third party authority to register a Voter's DEC in the registry
    /// @dev the DEC contains sensitive data that must be encrypted
    function registerDEC(decData memory dec, address voter) public onlyOwner {
        require(
            registry[voter].length == 0,
            "The Voter's DEC has been already registered"
        );
        registry[voter] = encryptDEC(dec);
        emit DECRegistered(voter, registry[voter]);
        return;
    }

    /// @notice this function returns an encrypted DEC in order to check if a Voter has the voting rights
    function getDEC(address voter) public view returns (bytes memory) {
        require(
            registry[voter].length != 0,
            "The Voter don't have a registered DEC"
        );
        return registry[voter];
    }

    /// @notice this function checks in the registry if the Voter already voted in a certail election
    function hasVoterAlreadyVoted(
        address voter,
        address election
    ) public view returns (bool) {
        for (uint i = 0; i < electoralStamps[voter].length; i++) {
            if (electoralStamps[voter][i] == election) {
                return true;
            }
        }
        return false;
    }

    /// @notice this function put the election stamp on the Voter's DEC after the vote
    /// @dev the owner of the DECs registry is the same of the election smart contract (third party authority)
    function stampsTheDEC(address election, address voter) public onlyOwner {
        electoralStamps[voter].push(election);
        emit DECStamped(election, voter);
        return;
    }
}
