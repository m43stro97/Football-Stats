import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { get } from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

import Subtitle from './Subtitle';
import '../../App.css';
import '../../css/TableStandings.css';
import TransitionModal from './TransictionModal';

import { IconButton } from '@material-ui/core';

const TableComponent = ({title, rows, headers, css}) => {

  const renderText = (row, header) => {

    let textToRender;

    if (Array.isArray(header.key)) {
      const result = header.key.map(key => get(row, key, key));
      const hasResult = result.every(it => it !== null);

      textToRender = hasResult ? result.join('') : ' - ';
    } else {
      textToRender = get(row, header.key);
    }

    if (header.link) {
      textToRender = (
        <Link to={header.link.replace(':id', get(row, header.propLink))}>
          {textToRender}
        </Link>);
    }

    if (header.type === 'button') {
      textToRender = (
        <TransitionModal buttonText={textToRender} match={row} />
      );
    }
    return textToRender;
  };

  return (
    <>
      <Subtitle title={title} />
      <TableContainer component={Paper} className={css}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {(headers || []).map((it, index) =>
                <TableCell key={`${title}-header-${index}`}>
                  {it.text}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rows || []).map((row, index) => (
              <TableRow key={`${title}-row-${index}`}>
                {headers.map((header, indexCell) => (
                  <TableCell key={`${title}-cell-${index}-${indexCell}`}>
                    {renderText(row, header)}
                  </TableCell>))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default TableComponent;
