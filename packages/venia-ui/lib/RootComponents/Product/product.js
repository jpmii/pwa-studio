import React, { Fragment } from 'react';
import { useProduct } from '@magento/peregrine/lib/talons/RootComponents/Product/useProduct';

import { Title, Meta } from '../../components/Head';
import { fullPageLoadingIndicator } from '../../components/LoadingIndicator';
import ProductFullDetail from '../../components/ProductFullDetail';
import getUrlKey from '../../util/getUrlKey';
import mapProduct from '../../util/mapProduct';

/*
 * As of this writing, there is no single Product query type in the M2.3 schema.
 * The recommended solution is to use filter criteria on a Products query.
 * However, the `id` argument is not supported. See
 * https://github.com/magento/graphql-ce/issues/86
 * TODO: Replace with a single product query when possible.
 */
import {
    GET_PRODUCT_DETAIL,
    GET_PRODUCT_DETAIL_FROM_CACHE,
    PRODUCT_TYPE_POLICIES
} from './product.gql';

const Product = () => {
    const talonProps = useProduct({
        mapProduct,
        typePolicies: PRODUCT_TYPE_POLICIES,
        queries: {
            getProductFromCache: GET_PRODUCT_DETAIL_FROM_CACHE,
            getProductFromNetwork: GET_PRODUCT_DETAIL
        },
        urlKey: getUrlKey()
    });

    const { error, loading, product } = talonProps;

    if (loading && !product) return fullPageLoadingIndicator;
    if (error && !product) return <div>Data Fetch Error</div>;

    if (!product) {
        return (
            <h1>
                This Product is currently out of stock. Please try again later.
            </h1>
        );
    }

    // Note: STORE_NAME is injected by Webpack at build time.
    return (
        <Fragment>
            <Title>{`${product.name} - ${STORE_NAME}`}</Title>
            <Meta name="description" content={product.meta_description} />
            <ProductFullDetail product={product} />
        </Fragment>
    );
};

export default Product;
