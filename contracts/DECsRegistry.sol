// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.24;

/// @title The Register of the Voter's Digital Electoral Cards
/// @author Christian Palazzo <palazzochristian@yahoo.it>
/// @custom:experimental This is an experimental contract.
contract DEC {

    address public owner;

    constructor() {
        /// @dev only the owner of the contract has write permissions
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    
    /// @notice This is the Digital Electoral Card, emitted by a public third-party authority and owned by the Voter
    /// @dev This data is encrypted with the Voter's public address and only the Voter can decrypt it using the private key
    struct DECdata {
        string taxCode;
        string municipality;
        string province;
        string region;
        string country;
    }

    /// @notice this is the list of stamps of elections in which the voter participated
    /// @dev the address is related to the Election smart contract
    mapping (uint => address) ElectoralStamps;


    /// @notice This function is used to encrypt ad digitally sign a DEC
    function encryptDEC(DECdata memory dec) public view onlyOwner returns (bytes memory) {
        bytes memory encodedData = abi.encodePacked(
            dec.taxCode, dec.municipality, dec.province, dec.region, dec.country
        );
        bytes32 hashedData = keccak256(encodedData);
        bytes memory signature = signData(hashedData);

        return abi.encodePacked(hashedData, signature);
    }


    /// @notice This function is used to decrypt and verify the signature of a DEC
    function decryptDEC(bytes memory encryptedData, address eoaAddress) public pure returns (bool) {
        require(encryptedData.length == 96, "Invalid encrypted data length");

        bytes32 hashedData;
        bytes memory signature;
        assembly {
            hashedData := mload(add(encryptedData, 32))
            signature := mload(add(encryptedData, 64))
        }

        address signer = recoverSigner(hashedData, signature);
        return signer == eoaAddress;
    }


    /// @notice  This function is used to digitally sign the data
    function signData(bytes32 data) private pure returns (bytes memory) {
        bytes32 hash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", data));
        bytes1 v = bytes1(0);
        bytes32 r = bytes32(0);
        bytes32 s = uintToBytes32(1);
        return abi.encodePacked(ecrecover(hash, uint8(v), r, s), r, s);
    }

    /// @notice this function is used in signData function
    function uintToBytes32(uint256 x) private pure returns (bytes32) {
        return bytes32(x);
    }


    /// @notice This function is used to retrieve the signer of the signed data
    function recoverSigner(bytes32 dataHash, bytes memory signature) private pure returns (address) {
        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            r := mload(add(signature, 32))
            s := mload(add(signature, 64))
            v := and(mload(add(signature, 65)), 0xff)
        }

        if (v < 27) {
            v += 27;
        }

        return ecrecover(dataHash, v, r, s);
    }
}