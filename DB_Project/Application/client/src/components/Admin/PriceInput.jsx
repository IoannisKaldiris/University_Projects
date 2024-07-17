import { useState, useEffect } from 'react';

import { HStack, FormControl, FormLabel } from '@chakra-ui/react';
import { IconButton, Icon } from '@chakra-ui/react';
import { FaSave } from 'react-icons/fa';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

const PriceInput = ({ label, defaultPrice, onSaveCallback = () => {} }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    defaultPrice && setValue(defaultPrice.amount);
  }, [defaultPrice]);

  return (
    <HStack maxW='40%' align='flex-end'>
      <FormControl>
        <FormLabel color='purple.200'>{label}</FormLabel>
        <NumberInput
          value={value}
          onChange={setValue}
          precision={2}
          step={0.05}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <IconButton
        aria-label={`Save ${label}`}
        icon={<Icon as={FaSave} />}
        variant='ghost'
        colorScheme='purple'
        onClick={() => {
          onSaveCallback(defaultPrice.sub_type, defaultPrice.show_type, value);
        }}
      />
    </HStack>
  );
};

export default PriceInput;
