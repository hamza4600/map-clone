// PROTOTYPE
import Form from './prototype/Form';

// PARTS
import Body from './parts/Body';
import Col from './parts/Col';
import Feedback from './parts/Feedback';
import Group from './parts/Group';
import Label from './parts/Label';
import Row from './parts/Row';
import Text from './parts/Text';
import Button from './button/Button';

// CONTROL COMPONENTS
import Control from './control/Control';
import Checklist from './control/types/checklist/Checklist';
import Date from './control/types/date/Date';
import Hidden from './control/types/Hidden';
import RichText from './control/types/RichText';
import Select from './control/types/select/Select';
import StateZip from './control/types/StateZip';
import Textarea from './control/types/Textarea';
import Toggle from './control/types/toggle/Toggle';
import Upload from './control/types/upload/Upload';
import YesNo from './control/types/YesNo';
import Dollar from './control/types/Dollar';

// PARTS
Form.Row       = Row;
Form.Col       = Col;
Form.Body      = Body;
Form.Group     = Group;
Form.Label     = Label;
Form.Feedback  = Feedback;
Form.Button    = Button
Form.Text      = Text;

// CONTROL COMPONENTS
Form.Control      = Control;
Form.Hidden       = Hidden;
Form.Textarea     = Textarea;
Form.Checklist    = Checklist;
Form.Select       = Select;
Form.StateZip     = StateZip;
Form.YesNo        = YesNo;
Form.Toggle       = Toggle;
Form.Date         = Date;
Form.RichText     = RichText;
Form.Upload       = Upload;
Form.Dollar       = Dollar

// EXPORT
export default Form;
