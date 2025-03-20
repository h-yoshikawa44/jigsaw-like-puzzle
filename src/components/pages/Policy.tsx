import { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

type Props = {
  handleBackTop: VoidFunction;
};

const Policy: FC<Props> = ({ handleBackTop }) => (
  <Container maxWidth="md" style={{ padding: '40px' }}>
    <Typography variant="h4" component="h2">
      当サービス（ Jigsaw Like Puzzle について）
    </Typography>
    <Typography component="p">
      2020/05/18～5/24で開催された、#web1weekの制作物です。
      <br />
      <Link href="https://crieit.net/boards/web1week-202005">
        １週間でWebサービスを作るイベント - お題「Like」
      </Link>
    </Typography>
    <Typography component="p">
      好きなもの → 趣味？ → 絵を描くこと（最近描いてないけど） → canvas →
      ただ絵を描くだけじゃつまらない → ジグソーパズル作れそう？
      といった感じで行きつきました。
      <br />
      ジグソーパズル特有の形は再現できてないので、あくまで「ジグソーパズルっぽいもの」です。
      <br />
      完全に後付け理由ですが、Like
      って「～ようなもの」って意味もありますし、意図せずテーマに沿ったものになりました（笑）
    </Typography>
    <Typography variant="h4" component="h2">
      アクセス解析ツールに関して
    </Typography>
    <Typography component="p">
      当サービスでは、Google によるアクセス解析ツール「Google
      Analytics」を利用しています。
      <br />
      これらはトラフィックデータの収集のために Cookie
      を使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません
      （氏名、住所、メール アドレス、電話番号は含まれません）
      <br />
      この機能は Cookie
      を無効にすることで収集を拒否できますので、お使いのブラウザの設定をご確認ください。
    </Typography>
    <Typography component="p">
      この機能の利用により収集されたデータは、Google
      社のプライバシーポリシーに基づいて管理されています。
      <br />
      利用規約・プライバシーポリシーについては以下でご確認ください。
    </Typography>
    <p>
      <Link href="https://www.google.co.jp/analytics/terms/jp.html">
        Google アナリティクス サービス利用規約
      </Link>
    </p>
    <Link href="https://policies.google.com/">Google ポリシーと規約</Link>
    <Box mt={6}>
      <Button variant="contained" color="primary" onClick={handleBackTop}>
        パズルに戻る
      </Button>
    </Box>
  </Container>
);

export default Policy;
