export default function CatalogItem({ title, imgSrc, altText, additionalClass }) {
    return (
        <a href="#" className={`Catalog_item ${additionalClass}`}>
            < p > { title }</ p>
            <img src={imgSrc} alt={altText} />
        </a>
    )
}