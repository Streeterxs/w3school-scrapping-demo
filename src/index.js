import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';
import * as fs from 'fs';

const fetchW3Schools = async () => {
    const url = 'https://www.w3schools.com/html/html_tables.asp';
    const response = await fetch(url);
    return response.text();
};

(async () => {
    const w3SchoolsPage = await fetchW3Schools();
    const dom = new JSDOM(w3SchoolsPage);
    const rowsWithHeader = Array.from(
        dom.window.document.querySelectorAll('#customers tr')
      )

    const [ tableHeader, ...rows] = rowsWithHeader.map(item => Array.from(item.querySelectorAll('td')));
    let objectfiedTableContent = rows.map(row => {
        return {
            company: row[0].textContent,
            contact: row[1].textContent,
            country: row[2].textContent,
        }
    });

    const cwd = process.cwd();
    await fs.writeFile(`${cwd}/output/customers.json`, JSON.stringify(objectfiedTableContent), console.log)
})();
