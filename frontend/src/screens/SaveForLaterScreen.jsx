import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { moveToSave, removeFromSave,clearSaveItems, } from "../slices/moveSlice";
import { addToCart } from '../slices/cartSlice';

const SaveForLaterScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const saveForLater = useSelector((state) => state.saveForLater);
  const { saveForLaterItems } = saveForLater;

  const moveToSaveForLaterHandler = async (product, qty) => {
    dispatch(moveToSave({ ...product, qty }));
  };

  const removeFromSaveHandler = async (id) => {
    dispatch(removeFromSave(id));
  };

  const proceedToCartHandler = () => {
    // Iterate through each item in saveForLaterItems and dispatch addToCart for each item
    saveForLaterItems.forEach((item) => {
      dispatch(addToCart({ ...item, qty: item.qty })); // Ensure to use item.qty for quantity
    });

    dispatch(clearSaveItems());
    navigate('/cart');
  };
  

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}>Save For Later</h1>
        {saveForLaterItems.length === 0 ? (
          <Message>
            Your save for later list is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {saveForLaterItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => moveToSaveForLaterHandler(item, Number(e.target.value))}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromSaveHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({saveForLaterItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {saveForLaterItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={saveForLaterItems.length === 0}
                onClick={proceedToCartHandler}
              >
                Move To Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default SaveForLaterScreen;
