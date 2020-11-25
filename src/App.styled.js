import 'antd/dist/antd.compact.min.css';
import styled from '@emotion/styled';
import {Layout, Input} from 'antd';

const {Header, Content} = Layout;

export const PageHeader = styled(Header)`
  background-color: #0076b3;
  height: 80px;
  display: flex;
  align-items: center;
`

export const PageBody = styled(Content)`
  padding: 0 50px;
`;

export const PageLogoContainer = styled.span`
  padding: 0 16px;
`;

export const PageTitle = styled.span`
  color: white;
  font-size: 16px;
`;

export const SearchBar = styled(Input.Search)`
  width: 100%;
`;
