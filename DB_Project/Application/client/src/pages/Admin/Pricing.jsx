// React Router
import { useLoaderData } from 'react-router-dom';

// Chakra UI
import { VStack, useToast } from '@chakra-ui/react';

import PriceInput from '../../components/Admin/PriceInput';

import { updatePricing } from '../../api/admin.requests';

const Pricing = () => {
  const pricing = useLoaderData();
  const toast = useToast();

  const onSavePriceCallback = async (subType, showType, amount) => {
    const res = await updatePricing(subType, showType, amount);

    if (res) {
      toast({
        title: 'Pricing updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Error updating pricing',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack w='60%'>
      <PriceInput
        label='Price/film (Films & Series)'
        onSaveCallback={onSavePriceCallback}
        defaultPrice={
          pricing.filter(
            (price) =>
              price.sub_type === 'FILMS_AND_SERIES' &&
              price.show_type === 'FILM'
          )[0]
        }
      />
      <PriceInput
        label='Price/episode (Films & Series)'
        onSaveCallback={onSavePriceCallback}
        defaultPrice={
          pricing.filter(
            (price) =>
              price.sub_type === 'FILMS_AND_SERIES' &&
              price.show_type === 'EPISODE'
          )[0]
        }
      />
      <PriceInput
        label='Price/film (Only Films)'
        onSaveCallback={onSavePriceCallback}
        defaultPrice={
          pricing.filter(
            (price) =>
              price.sub_type === 'ONLY_FILMS' && price.show_type === 'FILM'
          )[0]
        }
      />
      <PriceInput
        label='Price/episode (Only Series)'
        onSaveCallback={onSavePriceCallback}
        defaultPrice={
          pricing.filter(
            (price) =>
              price.sub_type === 'ONLY_SERIES' && price.show_type === 'EPISODE'
          )[0]
        }
      />
    </VStack>
  );
};

export default Pricing;
