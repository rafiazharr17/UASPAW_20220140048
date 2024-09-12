import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <InputGroup maxW="600px" mx={4}>
        <Input
          placeholder="Cari produk"
          bg="white"
          color="black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <InputRightElement>
          <Button type="submit" bg="white" color="green.500">
            <SearchIcon />
          </Button>
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default SearchBar;
