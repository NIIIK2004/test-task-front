import ThreeDoorWardrobe from '../../assets/image/catalog/ThreeDoorWardrobe.png';
import TwoDoorWardrobe from '../../assets/image/catalog/TwoDoorWardrobe.png';
import Hinged from '../../assets/image/catalog/Hinged.png';
import MirrorWardrobe from '../../assets/image/catalog/MirrorWardrobe.png';
import Accessories from '../../assets/image/catalog/Accessories.png';
import CatalogItem from './CatalogItem';

export default function Catalog() {
    return (
        <section className="Catalog">
            <div className="container">
                <h1 className="title">Каталог</h1>
                <ul className="Catalog_wrapper">

                    <li className="catalog-big-block">
                        <CatalogItem
                            title="3-х дверные шкафы-купе"
                            imgSrc={ThreeDoorWardrobe}
                            altText="3-х дверные шкафы-купе"
                            additionalClass="textCenter"
                        />
                    </li>
                    <li className="catalog-medium-block">
                        <CatalogItem
                            title="2-х дверные шкафы-купе"
                            imgSrc={TwoDoorWardrobe}
                            altText="2-х дверные шкафы-купе"
                        />
                        <CatalogItem
                            title="Шкафы-купе с зеркалом"
                            imgSrc={MirrorWardrobe}
                            altText="Шкафы-купе с зеркалом"
                        />
                    </li>
                    <li className="catalog-small-block">
                        <CatalogItem
                            title="Распашные"
                            imgSrc={Hinged}
                            altText="Распашные"
                        />
                        <CatalogItem
                            title="Аксессуары"
                            imgSrc={Accessories}
                            altText="Аксессуары"
                        />
                    </li>
                </ul>
            </div>
        </section>
    )
}