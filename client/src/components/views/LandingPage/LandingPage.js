import Axios from 'axios';
import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import { Icon, Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';

function LandingPage() {
  
  const [Products, setProducts] = useState([])
  
  const renderCards = Products.map( (product, index) => {
    console.log("[TONY] 2. RENDER CARDS")
    console.log("[PRODUCT] ", product, " ", index)
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        {/*<Card cover={<img style={{width:'100%', height: '150px'}} src={`http://localhost:5000/${product.images}`}/>}>*/}
        <Card cover={<ImageSlider images={product.images}/>}>
        
          <Meta
            title={product.title}
            description={`$${product.price}`} />
        </Card>
      </Col>
    )
  })
  
  useEffect( () => {
    console.log("[TONY] 3. USE EFFECT")
    Axios.post('/api/product/products')
      .then(res => {
        if(res.data.success){
          console.log(res.data)
          setProducts(res.data.productInfo)
        }else{
          alert("상품들을 가져오는데 실패했습니다.")
        }
      })
  }, [])
  return (
    <div style={{width: '75%', margin: '3rem auto' }}>
      {console.log("[TONY] 1. RENDER")}

      <div style={{ textAlign: 'center' }}>
        <h2> Let'2 Travel Anywhere <Icon type="rocket" /></h2>
      </div>
      
      {/*Filter*/}

      {/*Search*/}

      {/*Cards*/}
      <Row gutter={[16,16]}>
        {renderCards}
      </Row>

      <div style={{ display: 'flex', justifyContent: 'center' }} >
        <button>더보기</button>
      </div>
    </div>
  )
}

export default LandingPage
