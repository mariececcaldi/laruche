import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import {
  Col,
  Input,
  message,
  Row,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
interface Product {
  id: string;
  image_front_small_url: string;
  product_name: string;
}
const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 20,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  const onChange: TableProps<Product>["onChange"] = (pagination) => {
    setPagination(pagination);
  };
  const searchForProducts = () => {
    try {
      setLoading(true);
      axios
        .get(
          `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&search_simple=1&action=process&fields=id%2Cproduct_name%2Cimage_front_small_url&json=1&page=${pagination.current}&page_size=${pagination.pageSize}`
        )
        .then((response) => {
          console.log(response.data);
          setShowResults(true);
          setProducts(response.data.products);
          setLoading(false);
          setPagination({ ...pagination, total: response.data.count });
        });
    } catch {
      message.error("Something went wrong with search");
    }
  };
  useEffect(() => {
    if (showResults) {
      searchForProducts();
    }
  }, [pagination.pageSize, pagination.current]);
  return (
    <>
      <Row justify={"center"}>
        <h1>Search Products</h1>
      </Row>
      <Row justify={"center"}>
        <Col span={20}>
          <Input
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            placeholder="Search products"
            onPressEnter={searchForProducts}
          />
        </Col>
      </Row>
      {(showResults || loading) && (
        <Row justify={"center"}>
          <Col span={16}>
            <Table
              style={{ cursor: "pointer" }}
              rowKey={"id"}
              showHeader={false}
              columns={[
                {
                  title: "Image",
                  dataIndex: "image_front_small_url",
                  key: "image_front_small_url",
                  width: "50%",
                  render: (image_front_small_url) => (
                    <img
                      style={{ maxHeight: "50px" }}
                      src={image_front_small_url}
                    />
                  ),
                },
                {
                  title: "Product name",
                  dataIndex: "product_name",
                  key: "product_name",
                  width: "50%",
                },
              ]}
              dataSource={products}
              loading={loading}
              pagination={pagination}
              onChange={onChange}
              onRow={(product) => {
                return {
                  onClick: () => {
                    window.open("/product/" + product.id, "_blank");
                  },
                };
              }}
            />
          </Col>
        </Row>
      )}
    </>
  );
};
export default SearchPage;
