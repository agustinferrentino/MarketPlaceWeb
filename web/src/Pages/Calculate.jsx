import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Flex, Title, Table, TextInput } from "@mantine/core";
function Calculate() {
  const [products, setProducts] = useState([]);
  const [newPrice, setNewPrice] = useState({});
  const handleLoad = () => {
    axios
      .get("https://localhost:5001/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  };
  useEffect(() => {
    handleLoad();
  }, []);

  const handleNewPriceChange = (productId, value) => {
    setNewPrice({ ...newPrice, [productId]: value });
  };

  const calculateProfit = (product) => {
    const price = newPrice[product.id]
      ? parseFloat(newPrice[product.id])
      : product.price;
    return (
      price -
      price * product.productCost.iva -
      product.shippingCost -
      product.commission
    );
  };

  const handleSave = (product) => {
    const updatedProduct = {
      ...product,
      price: newPrice[product.id]
        ? parseFloat(newPrice[product.id])
        : product.price,
      productCost: {
        ...product.productCost,
      },
    };

    axios
      .put(`https://localhost:5001/api/products/${product.id}`, updatedProduct)
      .then((response) => {
        console.log(response.status);
        if (response.status === 204) {
          handleLoad();
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };
  const rows = products.map((product) => (
    <Table.Tr key={product.id}>
      <Table.Td ta={"center"}>{product.title}</Table.Td>
      <Table.Td ta={"center"}>{product.originalPrice}</Table.Td>
      <Table.Td ta={"center"}>{product.price}</Table.Td>
      <Table.Td ta={"center"}>{product.commission}</Table.Td>
      <Table.Td ta={"center"}>{product.shippingCost}</Table.Td>
      <Table.Td ta={"center"}>{product.productCost.iva}</Table.Td>
      <Table.Td ta={"center"}>{product.productCost.cost}</Table.Td>
      <Table.Td ta={"center"}>{calculateProfit(product).toFixed(2)}</Table.Td>
      <Table.Td ta={"center"}>
        <TextInput
          type="number"
          value={newPrice[product.id] || ""}
          onChange={(e) => handleNewPriceChange(product.id, e.target.value)}
        />
      </Table.Td>
      <Table.Td ta={"center"}>
        <Button onClick={() => handleSave(product)}>Save</Button>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <Flex w={"100vw"} direction={"column"} align={"center"}>
      <Title>Calcular</Title>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th ta={"center"}>Nombre</Table.Th>
            <Table.Th ta={"center"}>Original Price</Table.Th>
            <Table.Th ta={"center"}>Price</Table.Th>
            <Table.Th ta={"center"}>Comisión</Table.Th>
            <Table.Th ta={"center"}>Costo Envio</Table.Th>
            <Table.Th ta={"center"}>IVA</Table.Th>
            <Table.Th ta={"center"}>Costo</Table.Th>
            <Table.Th ta={"center"}>Profit</Table.Th>
            <Table.Th ta={"center"}>New Price</Table.Th>
            <Table.Th ta={"center"}>Save</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Flex>
  );
}

export default Calculate;
