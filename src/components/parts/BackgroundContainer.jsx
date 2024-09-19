import React from 'react';

const styles = {
  paperContainer: {
    backgroundImage: `url(${process.env.PUBLIC_URL}/background.png)`,
    backgrounSize: 'cover',
    width: '100vw',
    height: "calc(100vh - 64px)",
    display: "flex"
  },
  card: {
    width: 'fit-content',
    backgroundColor: '#fff',
    borderRadius: '8px',
    margin: 'auto',
    padding: '4rem 3rem'
  }
};

const BackgroundContainer = ({ children }) => {

  return (
    <>
      <div style={styles.paperContainer}>
        <div style={styles.card}>
          {children}
        </div>
      </div>
    </>
  );
};

export default BackgroundContainer;
