// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./types/MarketTypes.sol";

contract SingleNFT is ERC1155, Ownable {
    using Counters for Counters.Counter;
    mapping(uint64 => MarketTypes.MockDeal) deals;

    mapping(uint256 => string) nft_uris; //
    
    Counters.Counter public _tokenIdCounter;

    constructor() ERC1155("") {
    }

    function uri(uint256 id) public view virtual override returns (string memory) {
        return nft_uris[id];
    }

    function setURI(uint256 _id, string memory _newuri) public onlyOwner {
        _setURI(_id,_newuri);
    }

    function mint(address account, uint256 amount, bytes memory data, string memory _uri, string memory _cid) public returns (uint256) {
        _tokenIdCounter.increment();
        _mint(account, _tokenIdCounter.current(), amount, data);
        _setURI( _tokenIdCounter.current(), _uri);
        return ( _tokenIdCounter.current() );
        addMockData(_cid);
    }

    function burn(address account, uint256 id, uint256 amount) public onlyOwner {
        nft_uris[id] = "";
        _burn(account, id, amount);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC1155) returns (bool) {
        return super.supportsInterface(interfaceId);
    } 

    function _setURI(uint256 id, string memory newuri) internal {
        nft_uris[id] = newuri;
    }


    function addMockData(string memory cid) internal virtual{
        MarketTypes.MockDeal memory deal;
        deal.id = _tokenIdCounter.current();
        deal.cid = cid;
        deal.size = 8388608;
        deal.verified = false;
        deal.client = "t01109";
        deal.provider = "t01113";
        deal.label = "mAXCg5AIg8YBXbFjtdBy1iZjpDYAwRSt0elGLF5GvTqulEii1VcM";
        deal.start = 25245;
        deal.end = 545150;
        deal.price_per_epoch = 1100000000000;
        deal.provider_collateral = 0;
        deal.client_collateral = 0;
        deal.activated = 1;
        deal.terminated = 0;

        deals[deal.id] = deal;
    }
}
