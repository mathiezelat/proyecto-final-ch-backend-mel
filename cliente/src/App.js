import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
import { AuthProviderContext } from './context/AuthContext';
import { CartProviderContext } from './context/CartContext';
import { OrderProviderContext } from './context/OrderContext';
import { ProductProviderContext } from './context/ProductContext';
import Navigation from './navigation'

function App() {
  return (
    <AuthProviderContext>
      <ProductProviderContext>
        <CartProviderContext>
          <OrderProviderContext>
            <ChakraProvider theme={theme}>
              <Navigation />
            </ChakraProvider>
          </OrderProviderContext>
        </CartProviderContext>
      </ProductProviderContext>
    </AuthProviderContext>
  );
}

export default App;
