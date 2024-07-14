import React, { Fragment, useEffect, useState } from 'react';
import Header from '../Header/Header';
import Catalog from '../Catalog/Catalog';
import ListCabinet from '../ListСabinets/ListСabinets';
import Footer from '../Footer/Footer';

export default function Home() {
  return (
    <Fragment>
      <Header />
      <Catalog />
      <ListCabinet titleSection="Список доступных шкафов" showAll={true} />
      <Footer />
    </Fragment>
  );
}
