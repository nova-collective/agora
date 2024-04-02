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

    struct Coalition {
        Candidate majorCandidate;
        string[] parties;
    }

    /// @dev the string is the party name mapped to its list of councilior candidates
    mapping(string => Candidate[]) public parties;
    Coalition[] public coalitions;

    /// @dev I need this variable to check if the councilior candidate names are unique
    mapping(string => bool) private isCounciliorCandidateInArray;

    /// @dev I need this variable to assign memory data to storage
    Candidate[] counciliorCandidatesArray;

    /// @dev it takes track of the parties already in coalition
    mapping(string => bool) partyExistsInCoalition;

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

    modifier isRegistrationPeriod() {
        require(
            block.timestamp >= registrationStart &&
                block.timestamp <= registrationEnd,
            "This function can be invoked only during the registration period"
        );
        _;
    }

    /**
     * During the registration period, each party registers to the election, presenting its list of councilor candidates.
     * The parties registered, can register a coalition of parties, indicating a candidate for the major.
     * The coalition can also be formed by a single party.
     * For the definition of the ballot paper they are considered only the coalitions data.
     */

    /// @notice as first step, we register the parties with their councilor candidates
    /// @dev only the owner of the contract has write permissions
    function registerParty(
        string memory name,
        string[] memory counciliorCandidates
    ) external onlyOwner isRegistrationPeriod {
        /**
         * 1. check that the function is invoked in the registration period
         * 2. check that the party is not already registered;
         * 3. check that the list of candidates is of 5 elements;
         * 4. check that the candidates name are unique;
         * 5. register the party with its candidates in the "parties" variable;
         */
        require(
            counciliorCandidates.length == 5,
            "The list of councilior candidates must be composed of 5 names"
        );

        for (uint i = 0; i < counciliorCandidates.length; i++) {
            require(
                !isCounciliorCandidateInArray[counciliorCandidates[i]],
                "Councilior candidate names must be unique"
            );
            isCounciliorCandidateInArray[counciliorCandidates[i]] = true;
        }

        for (uint i = 0; i < counciliorCandidates.length; i++) {
            counciliorCandidatesArray[i] = Candidate(
                counciliorCandidates[i],
                "councilior",
                0
            );
        }

        parties[name] = counciliorCandidatesArray;
    }

    /// @notice the parties already registered can form and register a coalition, indicating the candidate for major
    /// @dev only the owner of the contract has write permissions
    function registerCoalition(
        string memory majorCandidate,
        string[] memory coalitionParties
    ) external onlyOwner isRegistrationPeriod {
        /**
         * 1. check that the function is invoked in the registration period (consider a modifier); X
         * 2. check that the list of parties of the coalition are registered in the parties list; x
         * 3. check that in the list of parties there are no parties already registered in a coalition; x
         * 4. check that the name of the majorCandidate is unique; x
         * 5. register the coalition with the name of the majorCandidate;
         */
        require(_arePartiesRegistered(parties, coalitionParties), "One or more parties are not registered. Proceed with the registration first");
        require (!_arePartiesAlreadyInCoalition(coalitions, coalitionParties), "One or more parties are already present in a registered coalition");
        require(!_isMajorCandidateAlreadyRegistered(majorCandidate, coalitions), "The major candidate is already registered with a coalition");

        Candidate memory mcandidate = Candidate({
            name: majorCandidate,
            candidatesFor: 'major',
            points: 0
        }); 

        Coalition memory newCoalition = Coalition({
            majorCandidate: mcandidate,
            parties: coalitionParties
        });

        coalitions.push(newCoalition);
    }

    function _arePartiesRegistered(mapping(string => Candidate[]) storage registeredParties, string[] memory partiesToCheck) private view returns (bool) {
        for(uint i = 0; i < partiesToCheck.length; i++) {
            if (registeredParties[partiesToCheck[i]].length == 0) {
                return false;
            }
        }
        return true;
    }
    
    // Funzione per controllare se le parti sono già in una coalizione
    function _arePartiesAlreadyInCoalition(Coalition[] memory _coalitions, string[] memory partiesToCheck) private returns (bool) {
        for(uint i = 0; i < _coalitions.length; i++) {
            for(uint j = 0; j < _coalitions[i].parties.length; j++) {
                partyExistsInCoalition[_coalitions[i].parties[j]] = true;
            }
        }
        
        for(uint i = 0; i < partiesToCheck.length; i++) {
            if (partyExistsInCoalition[partiesToCheck[i]]) {
                return true;
            }
        }
        return false;
    }

    function _isMajorCandidateAlreadyRegistered(string memory candidateMajor, Coalition[] memory _coalitions) private pure returns (bool) {
    for(uint i = 0; i < _coalitions.length; i++) {
        if (keccak256(abi.encodePacked((_coalitions[i].majorCandidate.name))) == keccak256(abi.encodePacked((candidateMajor)))) {
            return true;
        }
    }
    return false;
}
}
