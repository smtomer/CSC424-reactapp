import React from "react";

function tableHeader() {
return (
    <thead>
        <tr>
            <th>
                Name
            </th>
            <th>
                Phone Number
            </th>
        </tr>
    </thead>
    );
}

function tableBody ({userContacts}) {
    const rows = userContacts.map((row, i) => {
        return (
            <tr key = {i}>
                <td>
                    {row.name}
                </td>
                <td>
                    {row.phoneNumber}
                </td>
            </tr>
        );
    });
    return (
        <tbody>
            {rows}
        </tbody>
    );
}

function Table({userContacts}) {
    return (
        <table>
            <tableHeader />
            <tableBody userContacts={userContacts} />
        </table>
    );
}

export default Table;