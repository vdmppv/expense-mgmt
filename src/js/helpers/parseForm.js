export function parseFrom(form) {
    const values = {};
    new FormData(form).forEach((value, key) => {
            values[key] = value;
        }
    );
    return values;
}
