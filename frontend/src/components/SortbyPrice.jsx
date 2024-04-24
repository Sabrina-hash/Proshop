import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

//sort by min price
const SortbyPrice = () => {
  const navigate = useNavigate();
  const [minPrice, setMinPrice] = useState('');

  //submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (minPrice) {
      navigate(`/minPrice/${minPrice}`);
      setMinPrice('');
    } else {
      navigate('/');
    }
  };
//main return
  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <Form.Control
        type='number'
        name='minPrice'
        onChange={(e) => setMinPrice(e.target.value)}
        value={minPrice}
        placeholder='Enter Min Price...' //placeholder input
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-light' className='p-2 mx-2'>
        Sort by Min Price
      </Button>
    </Form>
  );
};

export default SortbyPrice;
