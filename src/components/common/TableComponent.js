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

const TableComponent = ({title, rows, headers, css}) => (
  <>
    <Subtitle title={title} />
    <TableContainer component={Paper} className={css}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {(headers || []).map(it =>
              <TableCell >
                {it.text}
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rows || []).map(row => (
            <TableRow>
              {headers.map(header => {
                if (header.link) {
                  return (<TableCell>
                    <Link to={header.link.replace(':id', get(row, header.propLink))}>
                      {get(row, header.key)}
                    </Link>
                  </TableCell>);
                }
                if (Array.isArray(header.key)) {
                  const result = header.key.map(key => get(row, key, key));
                  const hasResult = result.every(it => it !== null);
                  return (
                    <TableCell>
                      {hasResult ? result.join('') : 'por jogar'}
                    </TableCell>);
                }
                return (
                  <TableCell>
                    {get(row, header.key)}
                  </TableCell>);
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
);
export default TableComponent;
