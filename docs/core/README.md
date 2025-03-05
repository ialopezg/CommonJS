## Comparing `humanizeTimeDiff` and `timeElapsed`

| Feature	                         | humanizeTimeDiff	                                                                         | timeElapsed                                                            |
|----------------------------------|-------------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| **Purpose**	                     | Expresses the difference between two dates relatively (e.g., "2 hours ago", "in 3 days")	 | Expresses the duration between two dates (e.g., "2 hours, 30 minutes") |
| **Output**                       | Style	Uses "ago" / "in" format	                                                           | Uses absolute duration                                                 |
| **Use Case**	                    | Used in UI/UX where relative time is more natural	                                        | Used for measuring exact elapsed time in logs, reports, or analytics   |
| **Granularity**	                 | Typically rounded to the largest unit	                                                    | Provides a detailed breakdown (years, weeks, days, etc.)               |
| **Handles "about"/"less than"**	 | Yes                                                                                       | 	Yes                                                                   |
| **Handles Future Dates**	        | Yes	                                                                                      | Not necessary (measures past duration)                                 |
