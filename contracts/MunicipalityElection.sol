// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.24;

import "./Election.sol";

/// @title The Municipality Election smart contract
/// @author Christian Palazzo <palazzochristian@yahoo.it>
/// @notice This is a kind of Election implementation of the Election mother contract.
/// @custom:experimental This is an experimental contract.
contract MunicipalityElection is Election {
    struct Candidate {
        string name;
        string candidatesFor; // major or councilior
        uint256 points;
    }

    /// @dev the string key of the map correspond tho the party name registered in the parties mapping
    struct Coalition {
        Candidate majorCandidate;
        mapping(string => bool) parties;
    }

    /// @dev the of the mapping is the party name
    mapping(string => Candidate[]) private parties;
    Coalition[] private coalitions;

    /// @dev this is a mapping used in private function
    mapping(string => bool) private isCounciliorCandidateInArray;
    Candidate[] private counciliorCandidatesArray;

    /// @dev this is a mapping used in private function
    mapping(string => bool) private partyExistsInCoalition;

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
            "This function can only be invoked during the registration period"
        );
        _;
    }

    function getCandidatesByParty(
        string memory partyName
    ) private view returns (string[] memory) {
        Candidate[] memory candidateList = parties[partyName];
        string[] memory candidateNames = new string[](candidateList.length);

        // Estrae i nomi dei candidati dal mapping
        for (uint i = 0; i < candidateList.length; i++) {
            candidateNames[i] = candidateList[i].name;
        }

        return candidateNames;
    }

    /// @notice as first step, during the registration period the parties register their names and list of councilior candidates
    function registerParty(
        string memory name,
        string[] memory counciliorCandidates
    ) external onlyOwner isRegistrationPeriod {
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

        parties[name] = counciliorCandidatesArray;
    }

    /// @notice in this second step, the parties registered compose coalitions and indicate a major candidate name. A coalition is composed by one or more parties.
    function registerCoalition(
        string memory majorCandidate,
        string[] memory coalitionParties
    ) external onlyOwner isRegistrationPeriod {
        require(
            _arePartiesRegistered(coalitionParties),
            "One or more parties are not registered. Proceed with the registration first"
        );
        require(
            !_arePartiesAlreadyInCoalition(coalitionParties),
            "One or more parties are already present in a registered coalition"
        );
        require(
            !_isMajorCandidateAlreadyRegistered(majorCandidate),
            "The major candidate is already registered with a coalition"
        );

        Candidate memory mcandidate = Candidate({
            name: majorCandidate,
            candidatesFor: "major",
            points: 0
        });

        Coalition storage newCoalition = coalitions[coalitions.length];
        for (uint i = 0; i < coalitionParties.length; i++) {
            newCoalition.parties[coalitionParties[i]] = true;
        }
        newCoalition.majorCandidate = mcandidate;
    }

    function _arePartiesRegistered(
        string[] memory partiesToCheck
    ) private view returns (bool) {
        for (uint i = 0; i < partiesToCheck.length; i++) {
            if (parties[partiesToCheck[i]].length == 0) {
                return false;
            }
        }
        return true;
    }

    function _arePartiesAlreadyInCoalition(
        string[] memory partiesToCheck
    ) private view returns (bool) {
        for (uint i = 0; i < coalitions.length; i++) {
            for (uint j = 0; j < partiesToCheck.length; j++) {
                if (coalitions[i].parties[partiesToCheck[j]]) {
                    return true;
                }
            }
        }
        return false;
    }

    function _isMajorCandidateAlreadyRegistered(
        string memory candidateMajor
    ) private view returns (bool) {
        for (uint i = 0; i < coalitions.length; i++) {
            if (
                keccak256(
                    abi.encodePacked(coalitions[i].majorCandidate.name)
                ) == keccak256(abi.encodePacked(candidateMajor))
            ) {
                return true;
            }
        }
        return false;
    }
}
