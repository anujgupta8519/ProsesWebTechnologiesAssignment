const parseDate = (inputDate) => {

    const parsedDate = new Date(inputDate);
    return parsedDate.toISOString().split('T')[0];
}
export default parseDate