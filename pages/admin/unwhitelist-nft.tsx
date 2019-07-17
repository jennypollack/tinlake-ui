import * as React from 'react';
import WithTinlake from '../../components/WithTinlake';
import Alert from '../../components/Alert';
import { Box } from 'grommet';
import Header, { MenuItem } from '../../components/Header';
import UnwhitelistNFT from '../../components/UnwhitelistNFT';

const menuItems: MenuItem[] = [
  { label: 'NFTs', route: '/admin' },
];

class UnwhitelistPage extends React.Component<{ loanId: string }> {
  static async getInitialProps({ query }: any) {
    return { loanId: query.loanId };
  }

  render() {
    const { loanId } = this.props;

    return <Box align="center">
      <Header
        selectedRoute={`/admin/unwhitelist-nft?loanId=${loanId}`}
        menuItems={menuItems.reverse()}
        section="ADMIN"
      />
      <Box
        justify="center"
        direction="row"
      >
        <Box width="xlarge">
          {loanId ? (
            <WithTinlake render={tinlake =>
              <UnwhitelistNFT tinlake={tinlake} loanId={loanId} />} />
          ) : (
              <Alert type="error">Please provide an ID</Alert>
            )}
        </Box>
      </Box>
    </Box>;
  }
}

export default UnwhitelistPage;