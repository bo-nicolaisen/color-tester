
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = 'https://gbcpbrlqpjrawbsytxex.supabase.co';
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdiY3BicmxxcGpyYXdic3l0eGV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3MjM2NjcsImV4cCI6MjA0MjI5OTY2N30.3MAI1pcCl8fKh826j3VPGR09F3uyXHJ0byqNEggRMfg";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase

