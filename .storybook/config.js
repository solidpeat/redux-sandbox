import { configure, addDecorator } from '@kadira/storybook';
import React from 'react';

addDecorator((story) => (
  <div style={{padding: '15px'}}>
    {story()}
  </div>
));

const req = require.context('../src/components', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
