import React from 'react';

export default function Warning({msg}: {msg: string}) {
  return (
    <div className='px-8 border-4 border-red-400 border-solid p-8 rounded-lg bg-red-50'>
      <p className='text-xl font-semibold'>{msg}</p>
    </div>
  );
}
