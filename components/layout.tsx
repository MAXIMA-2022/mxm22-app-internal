import Head from 'next/head'

const Layout = ({children}:any) => {
  return (
   <>
    <Head>
      <title>MAXIMA 2022</title>
      <link rel="shortcut icon" href="/mxmIcon.png" />
      <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,800;0,900;1,200;1,300&family=Rubik:wght@300;400&display=swap" rel="stylesheet"></link>
    </Head>
    {children} 
   </>  
  );
}
 
export default Layout;