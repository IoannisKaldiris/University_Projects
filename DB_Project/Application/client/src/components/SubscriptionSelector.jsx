// Chakra UI
import { FormControl, FormLabel } from '@chakra-ui/react';
import { RadioGroup, Radio, HStack } from '@chakra-ui/react';

const SubscriptionSelector = ({ value, setValue, colorScheme = 'teal' }) => {
  return (
    <FormControl as='fieldset'>
      <FormLabel as='legend'>Subscription Type</FormLabel>
      <RadioGroup value={value} onChange={setValue} colorScheme={colorScheme}>
        <HStack>
          <Radio value='ONLY_FILMS'>Only Films</Radio>
          <Radio value='ONLY_SERIES'>Only Series</Radio>
          <Radio value='FILMS_AND_SERIES'>Films & Series</Radio>
        </HStack>
      </RadioGroup>
    </FormControl>
  );
};

export default SubscriptionSelector;
