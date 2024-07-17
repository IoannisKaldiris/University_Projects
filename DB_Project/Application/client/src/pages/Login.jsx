import { useEffect, useRef } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/slices/user.slice';

// React Router
import { useNavigate } from 'react-router-dom';

// Chakra UI
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Image,
  Heading,
} from '@chakra-ui/react';
import logo512 from '../assets/logo512.png';

// API
import { validateEmail } from '../api/global.requests';

const Login = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const emailRef = useRef();
  const toast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.loggedIn) {
      if (user.isCustomer) navigate('/films');
      else {
        if (user.isAdmin) navigate('/admin/customers');
        else navigate('/employee/customers');
      }
    }
  }, [user, navigate]);

  const onLoginClick = async () => {
    const res = await validateEmail(emailRef.current.value);

    if (res.loggedIn) {
      toast({
        title: 'Login Successful',
        description: 'You have been logged in successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      dispatch(login(res));
    } else {
      toast({
        title: 'Login Failed',
        description: 'The email you entered is not registered.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack w='100%' h='100vh' justify='center'>
      <Image src={logo512} boxSize='150px' />

      <Heading color='teal.200' as='i'>
        rentomatic
      </Heading>

      <FormControl w='20%'>
        <FormLabel>Email</FormLabel>
        <Input variant='filled' ref={emailRef} />
      </FormControl>

      <Button colorScheme='teal' onClick={onLoginClick}>
        Login
      </Button>
    </VStack>
  );
};

export default Login;
