import type { NextPage } from 'next'
import { motion } from 'framer-motion'
import Layout from '../layout/Layout'
import classes from '../styles/policy.module.scss'

const Policy: NextPage = () => {
  return (
    <Layout meta={{ name: 'Privacy Policy' }} style={{ overflow: 'hidden', height: '120vh' }}>
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        className={classes.bg}
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: [0.6, 0.01, -0.05, 0.95] }}
        className={classes.policy}
      >
        <h2>Terms of Service</h2>
        <p>
          THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
          IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
          PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
          BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
          TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
          OTHER DEALINGS IN THE SOFTWARE.
        </p>
        <h2>Privacy Policy</h2>
        <div className={classes.headline}>
          This site uses JSON Web Tokens and an in-memory database which resets every ~2 hours.
        </div>
        <p>
          Data provided to this site is exclusively used to support signing in and is not passed to
          any third party services, other than via SMTP or OAuth for the purposes of authentication.
        </p>
      </motion.div>
    </Layout>
  )
}

export default Policy
