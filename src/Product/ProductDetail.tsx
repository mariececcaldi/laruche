import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Badge, Col, Descriptions, Image, Row, Space, Tag } from "antd";
import { useParams } from "react-router-dom";
import { StopOutlined } from "@ant-design/icons";
interface ProductDetail {
  image_front_url: string;
  product_name: string;
  allergens_hierarchy: string[];
  categories: string;
  ingredients_text: string;
}
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetail>();

  useEffect(() => {
    axios
      .get(
        `https://world.openfoodfacts.org/api/v0/product/${id}.json?fields=product_name%2Ccategories%2Cimage_front_url%2Callergens_hierarchy%2Cingredients_text`
      )
      .then((response) => {
        console.log(response);
        setProduct(response.data.product);
      });
  }, [id]);
  return (
    <>
      {product && (
        <>
          <Row justify={"center"}>
            <h1>{product.product_name}</h1>
          </Row>
          <Row justify={"space-around"}>
            <Col span={6}>
              <img src={product.image_front_url} />
            </Col>
            <Col span={16}>
              <Descriptions bordered>
                <Descriptions.Item label="Allergies">
                  {(product.allergens_hierarchy.length > 0 &&
                    product.allergens_hierarchy.map((allergy) => (
                      <Tag style={{ margin: "5px" }} key={allergy}>
                        {allergy}
                      </Tag>
                    ))) || <StopOutlined />}
                </Descriptions.Item>
                <Descriptions.Item label="categories" span={2}>
                  {product.categories.split(",").map((category) => (
                    <Tag style={{ margin: "5px" }} key={category}>
                      {category}
                    </Tag>
                  ))}
                </Descriptions.Item>
                <Descriptions.Item label="Ingredients" span={3}>
                  {product.ingredients_text}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
export default ProductDetail;
