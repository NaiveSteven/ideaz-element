import { defineComponent } from 'vue';
import ZRadio from './index';

export default defineComponent({
  components: { ZRadio },
  setup() {
    return (
      <ZRadio
        value={1}
        options={[
          { label: '无锡', value: 1 },
          { label: '南京', value: 2 },
        ]}
      />
    );
  },
});
