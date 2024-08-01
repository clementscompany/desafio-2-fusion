import React, { useEffect, useState } from 'react';

interface HeaderProps {
  path: number,
  className:string
}

const Header: React.FC<HeaderProps> = ({ path, className}) => {
    const[pathName, setPathName] = useState<string>('');
    useEffect(()=>{
        switch (path) {
            case 0 :
                setPathName("Galeria")
                break;
        
            default:
                break;
        }
    }, [path])
  
  return (
    <header className={ className }>
       <div className="top">
            <h1>FrontEndFusion </h1><span><i className="bi bi-chevron-right"></i> { pathName }</span>
       </div>
    </header>
  );
};

export default Header;
