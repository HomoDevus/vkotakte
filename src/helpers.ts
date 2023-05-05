type TokenData = {
    id: string;
    user_type_id: 0 | 1;
    iat: number;
};

export function decodeJWT(token: string): TokenData {
    token = token.split(' ')[1]; // Remove Bearer from string

    let b64DecodeUnicode = (str: string) =>
        decodeURIComponent(
            Array.prototype.map
                .call(
                    atob(str),
                    (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                )
                .join('')
        );

    let parseJwt = (token: string) =>
        JSON.parse(
            b64DecodeUnicode(
                token.split('.')[1].replace('-', '+').replace('_', '/')
            )
        );

    return parseJwt(token);
}
