// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.24;

import "./Election.sol";

/// @title The Municipality Election smart contract
/// @author Christian Palazzo <palazzochristian@yahoo.it>
/// @custom:experimental This is an experimental contract.
contract MunicipalityElection is Election {
    
    struct Candidate {
        string name;
        string candidatesFor; // major or councilor
        uint256 points;
    }

    struct Party {
        string name;
        Candidate[] councilorCandidates;
    }
    
    struct Coalition {
        Candidate majorCandidate;
        Party[] parties;
    }

    Party[] public parties;
    Coalition[] public coalitions; 

    string public municipality;
    string public region;
    string public country;

    constructor(
        string memory _municipality,
        string memory _region,
        string memory _country,
        uint256 _registrationStart,
        uint256 _registrationEnd,
        int8 _votingPoints
    ) Election(_registrationStart, _registrationEnd, _votingPoints) {
        municipality = _municipality;
        region = _region;
        country = _country;
    }

    /**
     * During the registration period, each party registers to the election, presenting its list of councilor candidates.
     * The parties registered, can register a coalition of parties, indicating a candidate for the major.
     * The coalition can also be formed by a single party.
     * For the definition of the ballot paper they are considered only the coalitions data. 
     */

    /// @notice as first step, we register the parties with their councilor candidates
    /// @dev only the owner of the contract has write permissions
    function registerParty(string memory name, Candidate[] memory counciliorCandidates) public onlyOwner {
        /**
         * 1. check that the function is invoked in the registration period (consider a modifier);
         * 2. check that the party is not already registered;
         * 3. check that the list of candidates is of 5 elements;
         * 4. check that the candidates name are unique (check the lists of all parties);
         * 5. register the party with its candidates in the "parties" variable;
         */
    }

    /// @notice the parties already registered can form and register a coalition, indicating the candidate for major
    /// @dev only the owner of the contract has write permissions
    function registerCoalition(string memory candidateMajor, string[] memory coalitionParties) public onlyOwner {
        /**
         * 1. check that the function is invoked in the registration period (consider a modifier);
         * 2. check that the list of parties of the coalition are registered in the parties list;
         * 3. check that in the list of parties there are no parties already registered in a coalition;
         * 4. check that che name of the candidateMajor is unique (check the lists of all parties);
         * 5. register the coalition with the name of the candidateMajor;
         */
    }

}