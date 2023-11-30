import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {

} from './orderSlice';

export function Order() {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>order Page</h1>
    </div>
  );
}
