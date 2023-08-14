type NumOrString = string | number | bigint

const formatNumber = ( value:NumOrString ) =>
{
    return value ? ( new Intl.NumberFormat( 'en-NG', {
    } ) ).format( value as number | bigint) : 0;
};

const formatCurrency = ( value:NumOrString, symbol = "₦" ) =>
{
    return `${ symbol } ${ formatNumber( value ) }`;
};

export
{
    formatNumber,
    formatCurrency,
};

