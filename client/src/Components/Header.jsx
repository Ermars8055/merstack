import React from 'react';

function Header() {
  return (
    <header className="w-full text-center bg-purple-600 border-4 border-white shadow-lg py-8">
      <div className="flex flex-col items-center justify-center"> {/* Added flex container */}
        <h1 className="text-5xl font-bold text-white">Online Gold Shop</h1>
        <p className="mt-2 text-xl text-white">Easily explore, manage, and enjoy your favorite looks :!</p>
      </div>
    </header>
  );
}

export default Header;